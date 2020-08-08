use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

use calendar::connection::make_pool;
use calendar::views::{create_user, schedule_content, search_user};

#[get("/hello")]
async fn hello() -> impl Responder {
    println!("Got Access !!");
    HttpResponse::Ok().body("Hey there!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let pool = make_pool();

    let app = move || {
        App::new().service(hello).service(
            web::scope("/")
                .data(pool.clone())
                .service(create_user)
                .service(search_user)
                .service(schedule_content),
        )
    };

    HttpServer::new(app).bind("127.0.0.1:8000")?.run().await
}
