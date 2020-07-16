use crate::models::{Content, Schedule, User};
use actix_web::{get, post, web, HttpServer, Responder};
use diesel::pg::PgConnection;

#[derive(Deserialize, Serialize)]
struct Info {
    result: bool,
}

#[derive(Deserialize)]
struct UserData {
    username: String,
}

#[post("/create")]
pub async fn create_user(info: web::Json<UserData>, conn: &PgConnection) -> impl Responder {
    let res = User::insert(info.username, conn);

    match res {
        Ok(_) => web::Json(Info { result: true }),
        Err(_) => web::Json(Info { result: false }),
    }
}

#[post("/search")]
pub async fn search_user(info: web::Json<UserData>, conn: &PgConnection) -> impl Responder {
    let res = Schedule::get_schedule(info.username, conn);

    match res {
        Ok(contents) => web::Json(contents),
        Err(_) => web::Json(Info { result: false }),
    }
}

#[get("/user/{username}")]
pub async fn schedule_content(info: web::Path<UserData>, conn: &PgConnection) -> impl Responder {
    let res = Schedule::get_schedule(info.username, conn);

    match res {
        Ok(contents) => web::Json(contents),
        Err(_) => web::Json(Info { result: false }),
    }
}
