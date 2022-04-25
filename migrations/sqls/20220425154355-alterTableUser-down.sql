/* Replace with your SQL commands */
drop table if exist airsense.user

create table if not exists airsence_python.users
(
    userid      int                                      not null
        primary key,
    name        varchar(20) collate utf32_unicode_ci     null,
    fullname    varchar(255) collate utf32_unicode_ci    null,
    phoneNumber varchar(20) collate utf32_unicode_ci     null,
    email       varchar(255) collate utf32_vietnamese_ci null,
    password    varchar(50) collate utf32_vietnamese_ci  null,
    contact     varchar(255) collate utf32_vietnamese_ci null,
    addrid      int                                      not null,
    avartar     varchar(255) collate utf32_vietnamese_ci null,
    createat    datetime                                 not null,
    updateat    datetime                                 not null,
    id_create   int                                      not null,
    id_update   int                                      not null,
    note        varchar(30) collate utf32_vietnamese_ci  null,
    manifestid  int                                      not null,
    deleteflag  int                                      null
)
    charset = latin1;

