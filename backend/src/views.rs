use actix_web::{get, post, web, Responder};
use serde::{Deserialize, Serialize};

use crate::connection::DbPool;
use crate::models::{Schedule, User};

#[derive(Deserialize, Serialize)]
struct Info {
    result: bool,
}

#[derive(Deserialize, Serialize)]
pub struct UserData {
    username: String,
}

#[post("/create")]
pub async fn create_user(info: web::Json<UserData>, pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let res = User::insert(info.username.clone(), &conn);

    match res {
        Ok(_) => web::Json(Info { result: true }),
        Err(_) => web::Json(Info { result: false }),
    }
}

#[post("/search")]
pub async fn search_user(info: web::Json<UserData>, pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let res = Schedule::get_schedule(info.username.clone(), &conn);

    match res {
        Ok(contents) => web::Json(contents),
        Err(_) => panic!("Not found schedule"),
    }
}

#[get("/user/{username}")]
pub async fn schedule_content(
    info: web::Path<UserData>,
    pool: web::Data<DbPool>,
) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let res = Schedule::get_schedule(info.username.clone(), &conn);

    match res {
        Ok(contents) => web::Json(contents),
        Err(_) => panic!("Not found schedule"),
    }
}
