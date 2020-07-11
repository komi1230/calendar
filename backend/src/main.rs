use actix_web::{web, App, HttpServer, Result};
use chrono::{DateTime, Utc};
use serde::Deserialize;

#[derive(Deserialize)]
struct CreateUserRequest {
    userID: String,
    registerDate: String,
}

#[derive(Deserialize)]
struct CreateUserResponse {
    isExisted: bool,
}

#[derive(Deserialize)]
struct SearchUserResponse {
    userID: String,
}

#[derive(Deserialize)]
struct Schedule {
    userID: String,
    registerDate: String,
    from: String,
    to: String,
}

async fn create(info: web::Json<CreateUserRequest>) -> Result<String> {
    Ok(format!("Welcome {}!", info.userID))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::post().to(create)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
