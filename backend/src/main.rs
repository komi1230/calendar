use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello World !")
}

async fn index2() -> impl Responder {
    HttpResponse::Ok().body("Goodbye !")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .route("/bye", web::get().to(index2))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
