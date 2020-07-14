#[macro_use]
extern crate diesel;
extern crate dotenv;

use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;

use actix_web::{web, App, HttpServer, Responder};
use chrono::{DateTime, Utc};
use serde::Deserialize;
use std::env;

#[derive(Deserialize)]
struct CreateUserRequest {
    userID: String,
}

#[derive(Deserialize)]
struct CreateUserResponse {
    isExisted: bool,
}

#[derive(Deserialize)]
struct SearchUserResponse {
    userID: String,
}

fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL has to be set.");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

async fn create(info: web::Json<CreateUserRequest>) -> impl Responder {
    format!("Welcome {}!", info.userID)
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::post().to(create)))
        .bind("127.0.0.1:8088")?
        .run()
        .await
}
