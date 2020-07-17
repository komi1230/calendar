use actix_web::{get, App, HttpServer, Responder};
use diesel::pg::PgConnection;
use diesel::r2d2::ConnectionManager;
use dotenv::dotenv;
use r2d2::{Error, Pool, PooledConnection};

use std::env;

use calendar::views::{create_user, schedule_content, search_user};

pub type PgPool = Pool<ConnectionManager<PgConnection>>;
pub type PgPooled = PooledConnection<ConnectionManager<PgConnection>>;

pub fn new_pool() -> Result<PgPool, Error> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let manager = ConnectionManager::<PgConnection>::new(database_url);
    Pool::builder().max_size(15).build(manager)
}

#[get("/")]
async fn hello() -> impl Responder {
    "hello"
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let pool = match new_pool() {
        Ok(pool) => pool,
        Err(e) => panic!(e.to_string()),
    };

    let app = move || {
        App::new()
            .data(pool.clone())
            .service(create_user)
            .service(search_user)
            .service(schedule_content)
            .service(hello)
    };

    HttpServer::new(app).bind("127.0.0.1:8088")?.run().await
}
