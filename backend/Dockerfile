FROM rust:1.45

WORKDIR /rust/
COPY . .

EXPOSE 8000

RUN cargo build --release

CMD ["cargo", "run", "--release"]
