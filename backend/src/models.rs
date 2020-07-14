use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Queryable, Insertable)]
pub struct User {
    ID: String,
    registerDate: Option<NaiveDateTime>,
}

#[derive(Deserialize, Serialize, Queryable, Insertable)]
struct Schedule {
    userID: Option<String>,
    registerDate: String,
    from: Option<NaiveDateTime>,
    to: Option<NaiveDateTime>,
}
