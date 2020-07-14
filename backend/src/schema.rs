table! {
    users {
        username -> Text,
        registerdate -> Nullable<Timestamp>,
    }
}

table! {
    schedule {
        id -> Nullable<Text>,
        username -> Text,
        fromtime -> Nullable<Timestamp>,
        totime -> Nullable<Timestamp>,
    }
}

allow_tables_to_appear_in_same_query!(schedule, users,);
