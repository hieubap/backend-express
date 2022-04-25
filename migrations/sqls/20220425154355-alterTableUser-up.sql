/* Replace with your SQL commands */
rename table users to user;
alter table user
    change userid id int not null;

alter table user
    change fullname full_name varchar(255) collate utf32_unicode_ci null;

alter table user
    change phoneNumber phone_number varchar(20) collate utf32_unicode_ci null;

alter table user
    change addrid address_id int not null;

alter table user
    change id_created created_id int not null;

alter table user
    change id_updated updated_id int not null;

alter table user
    modify note varchar(255) collate utf32_vietnamese_ci null;

alter table user
    change manifestid manifest_id int not null;

alter table user
    change deleteflag deleted_at int null;

