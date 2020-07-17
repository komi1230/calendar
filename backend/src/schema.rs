table! {
    schedules (id) {
        id -> Nullable<Text>,
        username -> Text,
        fromtime -> Nullable<Timestamp>,
        totime -> Nullable<Timestamp>,
    }
}

table! {
    users (username) {
        username -> Text,
        registerdate -> Nullable<Timestamp>,
    }
}

allow_tables_to_appear_in_same_query!(
    schedules,
    users,
);
