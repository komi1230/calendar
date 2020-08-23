use chrono::NaiveDateTime;
use diesel::{self, prelude::*};
use serde::{Deserialize, Serialize};

use crate::schema::schedules::dsl::schedules as all_schedules;

use crate::schema::{schedules, users};

#[derive(Debug, Deserialize, Serialize, Queryable, Insertable)]
pub struct User {
    pub username: String,
    pub registerdate: Option<NaiveDateTime>,
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

    pub fn delete(username: String, conn: &PgConnection) -> QueryResult<usize> {
        diesel::delete(users::table.filter(users::username.eq(username))).execute(conn)
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

#[derive(Debug, Deserialize, Serialize, Queryable, Insertable)]
pub struct Schedule {
    pub id: i32,
    pub username: Option<String>,
    pub fromtime: Option<NaiveDateTime>,
    pub totime: Option<NaiveDateTime>,
}

#[derive(Insertable, Queryable, Deserialize, Serialize)]
#[table_name = "schedules"]
pub struct Content {
    pub username: String,
    pub fromtime: NaiveDateTime,
    pub totime: NaiveDateTime,
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
