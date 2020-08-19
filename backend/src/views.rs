use actix_web::{get, post, web, Responder};
use serde::{Deserialize, Serialize};

use crate::connection::DbPool;
use crate::models::{Schedule, User};

#[derive(Deserialize, Serialize)]
struct Info {
    result: bool,
}

#[derive(Deserialize, Serialize)]
pub struct UserData {
    username: String,
}

#[post("/create")]
pub async fn create_user(info: web::Json<UserData>, pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let res = User::insert(info.username.clone(), &conn);

    match res {
        Ok(_) => web::Json(Info { result: true }),
        Err(_) => web::Json(Info { result: false }),
    }
}

#[post("/search")]
pub async fn search_user(info: web::Json<UserData>, pool: web::Data<DbPool>) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let res = Schedule::get_schedule(info.username.clone(), &conn);

    match res {
        Ok(_) => web::Json(Info { result: true }),
        Err(_) => web::Json(Info { result: false }),
    }
}

#[get("/user/{username}")]
pub async fn schedule_content(
    info: web::Path<UserData>,
    pool: web::Data<DbPool>,
) -> impl Responder {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let res = Schedule::get_schedule(info.username.clone(), &conn);

    match res {
        Ok(contents) => web::Json(contents),
        Err(_) => panic!("Not found schedule"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::connection::make_pool;
    use actix_web::dev::Service;
    use actix_web::Error;
    use actix_web::{http, test, web, App};

    #[actix_rt::test]
    async fn test_search_user() -> Result<(), Error> {
        let pool = make_pool();

        let mut app = test::init_service(
            App::new().service(web::scope("/").data(pool.clone()).service(search_user)),
        )
        .await;

        let req = test::TestRequest::post()
            .uri("/search")
            .set_json(&UserData {
                username: "komi".to_owned(),
            })
            .to_request();

        let res = app.call(req).await.unwrap();

        assert_eq!(res.status(), http::StatusCode::OK);

        Ok(())
    }

    #[actix_rt::test]
    async fn test_create_user() -> Result<(), Error> {
        let pool = make_pool();

        let mut app = test::init_service(
            App::new().service(web::scope("/").data(pool.clone()).service(create_user)),
        )
        .await;

        let req = test::TestRequest::post()
            .uri("/create")
            .set_json(&UserData {
                username: "hoge".to_owned(),
            })
            .to_request();

        let res = app.call(req).await.unwrap();

        assert_eq!(res.status(), http::StatusCode::OK);

        Ok(())
    }

    #[actix_rt::test]
    async fn test_schedule_content() -> Result<(), Error> {
        let pool = make_pool();

        let mut app = test::init_service(
            App::new().service(web::scope("/").data(pool.clone()).service(schedule_content)),
        )
        .await;

        let req = test::TestRequest::get().uri("/user/komi").to_request();

        let res = app.call(req).await.unwrap();

        assert_eq!(res.status(), http::StatusCode::OK);

        Ok(())
    }
}
