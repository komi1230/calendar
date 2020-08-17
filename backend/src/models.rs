use chrono::NaiveDateTime;
use diesel::{self, prelude::*};
use serde::{Deserialize, Serialize};

use crate::schema::schedules::dsl::schedules as all_schedules;

use crate::schema::{schedules, users};

#[derive(Deserialize, Serialize, Queryable, Insertable)]
pub struct User {
    username: String,
    registerdate: Option<NaiveDateTime>,
}

impl User {
    pub fn insert(username: String, conn: &PgConnection) -> QueryResult<usize> {
        let user_data = User {
            username,
            registerdate: None,
        };
        diesel::insert_into(users::table)
            .values(user_data)
            .execute(conn)
    }

    pub fn search_outdated(deadline: NaiveDateTime, conn: &PgConnection) -> QueryResult<Vec<User>> {
        users::table
            .filter(users::registerdate.le(deadline))
            .load::<User>(conn)
    }

    pub fn delete_outdated(deadline: NaiveDateTime, conn: &PgConnection) -> QueryResult<usize> {
        diesel::delete(users::table.filter(users::registerdate.le(deadline))).execute(conn)
    }
}

#[derive(Deserialize, Serialize, Queryable, Insertable)]
pub struct Schedule {
    id: i32,
    username: Option<String>,
    fromtime: Option<NaiveDateTime>,
    totime: Option<NaiveDateTime>,
}

#[derive(Insertable, Queryable)]
#[table_name = "schedules"]
pub struct Content {
    username: String,
    fromtime: NaiveDateTime,
    totime: NaiveDateTime,
}

impl Schedule {
    pub fn insert(content: Content, conn: &PgConnection) -> QueryResult<Schedule> {
        diesel::insert_into(schedules::table)
            .values(content)
            .get_result(conn)
    }

    pub fn get_schedule(username: String, conn: &PgConnection) -> QueryResult<Vec<Self>> {
        schedules::table
            .into_boxed()
            .filter(schedules::username.eq(username))
            .load(conn)
    }

    pub fn delete(content: Content, conn: &PgConnection) -> QueryResult<usize> {
        diesel::delete(
            all_schedules
                .filter(schedules::username.eq(content.username))
                .filter(schedules::fromtime.eq(content.fromtime))
                .filter(schedules::totime.eq(content.totime)),
        )
        .execute(conn)
    }
}
