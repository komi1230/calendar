use actix_web::{get, middleware, post, web, App, Error, HttpResponse, HttpServer, Responder};
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

use calendar::connection::make_pool;
use calendar::views::{create_user, schedule_content, search_user};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let pool = make_pool();

    let app = move || {
        App::new()
            .service(
                web::scope("/")
                    .data(pool.clone())
                    .service(create_user)
                    .service(search_user)
                    .service(schedule_content),
            )
            .service(hello)
    };

    HttpServer::new(app).bind("127.0.0.1:8000")?.run().await
}
