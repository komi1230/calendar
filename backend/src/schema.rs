table! {
    schedules (id) {
        id -> Int4,
        username -> Nullable<Varchar>,
        fromtime -> Nullable<Timestamp>,
        totime -> Nullable<Timestamp>,
    }
}

table! {
    users (username) {
        username -> Varchar,
        registerdate -> Nullable<Timestamp>,
    }
}

allow_tables_to_appear_in_same_query!(
    schedules,
    users,
);
