use crate::models::{Content, Schedule, User};
use actix_web::{get, post, web, HttpServer, Responder};

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
