use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;

use actix_web::{get, web, App, HttpServer, Responder};
use serde::Deserialize;
use std::env;

use calendar::views::{create_user, schedule_content, search_user};

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

#[get("/")]
async fn hello() -> impl Responder {
    "hello"
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let conn = web::Data::new(establish_connection());

    let app = move || {
        App::new()
            .data(&conn)
            .service(create_user)
            .service(search_user)
            .service(schedule_content)
            .service(hello)
    };

    HttpServer::new(app).bind("127.0.0.1:8088")?.run().await
}
