use actix_web::{web, App, HttpRequest, HttpServer, Responder};
use listenfd::ListenFd;

async fn index(_: HttpRequest) -> impl Responder {
    "hogehgehoge"
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(|| App::new().route("/", web::get().to(index)));

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("127.0.0.1:3000")?
    };

    server.run().await
}
