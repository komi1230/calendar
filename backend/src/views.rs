use crate::models::{Schedule, User};
use actix_web::{get, post, web, Responder};
use diesel::pg::PgConnection;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct Info {
    result: bool,
}

#[derive(Deserialize, Serialize)]
struct UserData {
    username: String,
}

#[post("/create")]
pub async fn create_user(
    info: web::Json<UserData>,
    conn: web::Data<&PgConnection>,
) -> impl Responder {
    let res = User::insert(info.username.clone(), &conn);

    match res {
        Ok(_) => web::Json(Info { result: true }),
        Err(_) => web::Json(Info { result: false }),
    }
}

#[post("/search")]
pub async fn search_user(
    info: web::Json<UserData>,
    conn: web::Data<&PgConnection>,
) -> impl Responder {
    let res = Schedule::get_schedule(info.username.clone(), &conn);

    match res {
        Ok(contents) => web::Json(contents),
        Err(_) => panic!("Not found schedule"),
    }
}

#[get("/user/{username}")]
pub async fn schedule_content(
    info: web::Path<UserData>,
    conn: web::Data<&PgConnection>,
) -> impl Responder {
    let res = Schedule::get_schedule(info.username.clone(), &conn);

    match res {
        Ok(contents) => web::Json(contents),
        Err(_) => panic!("Not found schedule"),
    }
}
