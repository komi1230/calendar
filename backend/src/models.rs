use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Queryable, Insertable)]
pub struct User {
    ID: String,
    registerDate: String,
}

#[derive(Deserialize, Serialize, Queryable, Insertable)]
struct Schedule {
    userID: String,
    registerDate: String,
    from: String,
    to: String,
}
