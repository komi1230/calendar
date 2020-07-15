use chrono::{NaiveDate, NaiveDateTime, NaiveTime};
use diesel::{self, prelude::*};
use serde::{Deserialize, Serialize};

use crate::schema::schedule::dsl::{
    fromtime as all_fromtime, schedule as all_schedule, username as all_username,
};
use crate::schema::users::dsl::{registerdate as all_registerdate, username as all_username};
use crate::schema::{schedule, users};

#[derive(Deserialize, Serialize, Queryable, Insertable)]
#[table_name = "users"]
pub struct User {
    username: String,
    registerdate: Option<NaiveDateTime>,
}

impl User {
    pub fn insert(username: String, conn: &PgConnection) -> Result<usize> {
        let user_data = User {
            username: username,
            registerdate: None,
        };
        diesel::insert_into(users::table)
            .values(user_data)
            .execute(conn)
    }

    pub fn search_outdated(deadline: NaiveDateTime, conn: &PgConnection) -> Result<Vec<User>> {
        all_users
            .filter(users::registerdate.le(deadline))
            .load::<User>(conn)
    }

    pub fn delete_outdated(deadline: NaiveDateTime, conn: &PgConnection) -> Result<usize> {
        diesel::delete(all_users.filter(users::registerdate.le(deadline))).execute(conn)
    }
}

#[derive(Deserialize, Serialize, Queryable, Insertable)]
#[table_name = "schedule"]
pub struct Schedule {
    id: Option<String>,
    username: String,
    fromtime: Option<NaiveDateTime>,
    totime: Option<NaiveDateTime>,
}

pub struct Content {
    username: String,
    fromtime: NaiveDateTime,
    totime: NaiveDateTime,
}

impl Schedule {
    pub fn insert(content: Content, conn: &PgConnection) -> Result<usize> {
        let schedule_data = Schedule {
            id: None,
            username: content.username,
            fromtime: Some(content.fromtime),
            totime: Some(content.totime),
        };
        dielse::insert_into(schedule::table)
            .values(schedule_data)
            .execute(conn)
    }

    pub fn get_schedule(username: String, conn: &PgConnection) -> Result<Vec<Schedule>> {
        all_schedule
            .filter(schedule::username.eq(username))
            .load::<Schedule>(conn)
    }

    pub fn delete(content: Content, conn: &PgConnection) -> Result<usize> {
        diesel::delete(
            all_schedule
                .filter(schedule::username.eq(content.username))
                .filter(schedule::fromtime.eq(content.fromtime))
                .filter(schedule::totime.eq(content.totime)),
        )
        .execute(conn)
    }

    fn make_date(year: i32, month: u32, date: u32) -> NaiveDateTime {
        let tmp_date = NaiveDate::from_ymd(year, month, 1);
        let tmp_time = NaiveTime::from_hms_milli(0, 0, 0, 0);
        NaiveDateTime::new(tmp_date, tmp_time)
    }
}
