create table mynearbyplaces.place
(
	id bigserial primary key,
	name text not null unique,
	address text,
	info text
);

create table mynearbyplaces.review
(
	id bigserial primary key,
	username text,
	comment text,
	placename text references mynearbyplaces.place(name)
);