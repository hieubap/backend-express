/* Replace with your SQL commands */
create table if not exists airsense.address
(
    addrid             int auto_increment
        primary key,
    userid             int                                      not null,
    name               varchar(50) collate utf32_vietnamese_ci  null,
    contactPhoneNumber varchar(20) collate utf32_vietnamese_ci  null,
    province           varchar(100) collate utf32_vietnamese_ci null,
    city               varchar(100) collate utf32_vietnamese_ci null,
    streetaddr         varchar(100) collate utf32_vietnamese_ci null,
    postCode           varchar(12) collate utf32_vietnamese_ci  null,
    created_at         datetime                                 not null,
    updated_at         datetime                                 not null,
    id_created         int                                      not null,
    id_updated         int                                      not null,
    deleteflag         int                                      not null,
    oldid              int                                      not null
)
    charset = latin1
    auto_increment = 10;

create table if not exists airsense.content_group
(
    content_group_id int auto_increment
        primary key,
    content_group    varchar(50) collate utf32_vietnamese_ci null,
    title            varchar(50) collate utf32_vietnamese_ci null,
    created_at       datetime                                not null,
    updated_at       datetime                                not null,
    id_created       int                                     not null,
    id_updated       int                                     not null,
    deleteflag       int                                     not null,
    oldid            int                                     not null
)
    charset = latin1
    auto_increment = 4;

create table if not exists airsense.content_page
(
    content_page_id  int auto_increment
        primary key,
    content_sub_id   int                        not null,
    group_file       varchar(50)                null,
    filesave         varchar(100)               null,
    title            varchar(50) charset utf8   null,
    content          varchar(1024) charset utf8 null,
    content_img      varchar(1024) charset utf8 null,
    is_main_pages_id int                        not null,
    set_to_fist      bigint                     not null,
    created_at       datetime                   not null,
    updated_at       datetime                   not null,
    id_created       int                        not null,
    id_updated       int                        not null,
    deleteflag       int                        not null,
    oldid            int                        not null
)
    charset = latin1
    auto_increment = 543;

create table if not exists airsense.content_sub
(
    content_sub_id   int auto_increment
        primary key,
    content_group    varchar(50) collate utf32_vietnamese_ci null,
    content_group_id int                                     not null,
    title            varchar(50) collate utf32_vietnamese_ci null,
    created_at       datetime                                not null,
    updated_at       datetime                                not null,
    id_created       int                                     not null,
    id_updated       int                                     not null,
    deleteflag       int                                     not null,
    oldid            int                                     not null
)
    charset = latin1
    auto_increment = 45;

create table if not exists airsense.course
(
    course_id       int auto_increment
        primary key,
    course_group    varchar(50) collate utf32_vietnamese_ci null,
    course_group_id int                                     not null,
    title           varchar(50) collate utf32_vietnamese_ci null,
    created_at      datetime                                not null,
    updated_at      datetime                                not null,
    id_created      int                                     not null,
    id_updated      int                                     not null,
    deleteflag      int                                     not null,
    oldid           int                                     not null
)
    charset = latin1
    auto_increment = 45;

create table if not exists airsense.course_group
(
    course_group_id int auto_increment
        primary key,
    course_group    varchar(50) collate utf32_vietnamese_ci null,
    title           varchar(50) collate utf32_vietnamese_ci null,
    created_at      datetime                                not null,
    updated_at      datetime                                not null,
    id_created      int                                     not null,
    id_updated      int                                     not null,
    deleteflag      int                                     not null,
    oldid           int                                     not null
)
    charset = latin1
    auto_increment = 4;

create table if not exists airsense.course_page
(
    course_page_id   int auto_increment
        primary key,
    course_id        int                        not null,
    group_file       varchar(50)                null,
    filesave         varchar(100)               null,
    title            varchar(50) charset utf8   null,
    content          varchar(1024) charset utf8 null,
    content_img      varchar(1024) charset utf8 null,
    is_main_pages_id int                        not null,
    set_to_fist      bigint                     not null,
    created_at       datetime                   not null,
    updated_at       datetime                   not null,
    id_created       int                        not null,
    id_updated       int                        not null,
    deleteflag       int                        not null,
    oldid            int                        not null
)
    charset = latin1
    auto_increment = 541;

create table if not exists airsense.course_register
(
    course_register_id        int auto_increment
        primary key,
    customer_id               int                       not null,
    course_id                 int                       not null,
    value                     int                       not null,
    bank                      varchar(128) charset utf8 null,
    detail_bank               varchar(128) charset utf8 null,
    content                   varchar(128) charset utf8 null,
    course_register_status_id int                       not null,
    created_at                datetime                  not null,
    updated_at                datetime                  not null,
    id_created                int                       not null,
    id_updated                int                       not null,
    deleteflag                int                       not null,
    oldid                     int                       not null
)
    charset = latin1;

create table if not exists airsense.course_register_status
(
    course_register_status_id int auto_increment
        primary key,
    value                     int                       not null,
    detail                    varchar(128) charset utf8 null,
    created_at                datetime                  not null,
    updated_at                datetime                  not null,
    id_created                int                       not null,
    id_updated                int                       not null,
    deleteflag                int                       not null,
    oldid                     int                       not null
)
    charset = latin1;

create table if not exists airsense.customer
(
    customer_id   int unsigned                             not null
        primary key,
    username      varchar(255) collate utf8mb4_unicode_ci  not null,
    email         varchar(255) collate utf8mb4_unicode_ci  not null,
    password      varchar(255) collate utf8mb4_unicode_ci  not null,
    token_reset   varchar(128)                             not null,
    phone         varchar(15) collate utf8mb4_unicode_ci   null,
    avatar        text collate utf8mb4_unicode_ci          null,
    fullname      varchar(50)                              null,
    permission_id int unsigned                             null,
    address       varchar(255)                             null,
    note          varchar(100) collate utf32_vietnamese_ci null,
    created_at    timestamp                                null,
    updated_at    timestamp                                null,
    id_created    int                                      not null,
    id_updated    int                                      not null,
    deleteflag    int                                      not null,
    oldid         int                                      not null
)
    collate = utf8_unicode_ci;

create table if not exists airsense.exam
(
    exam_id       int auto_increment
        primary key,
    exam_group    varchar(50) collate utf32_vietnamese_ci null,
    exam_group_id int                                     not null,
    title         varchar(50) collate utf32_vietnamese_ci null,
    created_at    datetime                                not null,
    updated_at    datetime                                not null,
    id_created    int                                     not null,
    id_updated    int                                     not null,
    deleteflag    int                                     not null,
    oldid         int                                     not null
)
    charset = latin1
    auto_increment = 45;

create table if not exists airsense.exam_detail
(
    exam_detail_id   int auto_increment
        primary key,
    exam_id          int                        not null,
    group_file       varchar(50)                null,
    filesave         varchar(100)               null,
    title            varchar(50) charset utf8   null,
    content          varchar(1024) charset utf8 null,
    content_img      varchar(1024) charset utf8 null,
    is_main_pages_id int                        not null,
    reply            varchar(50) charset utf8   null,
    set_to_fist      bigint                     not null,
    mark             int                        not null,
    created_at       datetime                   not null,
    updated_at       datetime                   not null,
    id_created       int                        not null,
    id_updated       int                        not null,
    deleteflag       int                        not null,
    oldid            int                        not null
)
    charset = latin1
    auto_increment = 31;

create table if not exists airsense.exam_group
(
    exam_group_id int auto_increment
        primary key,
    course_id     int                                     not null,
    exam_group    varchar(50) collate utf32_vietnamese_ci null,
    title         varchar(50) collate utf32_vietnamese_ci null,
    created_at    datetime                                not null,
    updated_at    datetime                                not null,
    id_created    int                                     not null,
    id_updated    int                                     not null,
    deleteflag    int                                     not null,
    oldid         int                                     not null
)
    charset = latin1
    auto_increment = 4;

create table if not exists airsense.exam_reply
(
    reply_id       int auto_increment
        primary key,
    customer_id    int                      not null,
    exam_id        int                      not null,
    exam_detail_id int                      not null,
    reply          varchar(50) charset utf8 null,
    mark           int                      not null,
    created_at     datetime                 not null,
    updated_at     datetime                 not null,
    id_created     int                      not null,
    id_updated     int                      not null,
    deleteflag     int                      not null,
    oldid          int                      not null
)
    charset = latin1;

create table if not exists airsense.extended_data
(
    NodeId bigint not null,
    Time   int    not null
        primary key,
    CO     int    not null,
    CO2    int    not null,
    SO2    int    not null,
    NO2    int    not null,
    O3     int    not null
)
    charset = latin1;

create table if not exists airsense.history_delivery_warehouse_return
(
    id           int auto_increment
        primary key,
    idreturn     int      not null,
    id_user_send int      not null,
    id_adress    int      not null,
    created_at   datetime not null,
    updated_at   datetime not null,
    id_created   int      not null,
    id_updated   int      not null,
    deleteflag   int      not null,
    oldid        int      not null
)
    charset = latin1;

create table if not exists airsense.location
(
    Id                    int auto_increment
        primary key,
    Latitude              decimal(10, 4) null,
    Longtitude            decimal(10, 4) null,
    Altitude              int            null,
    Type                  int            null,
    PictureLinks          varchar(20)    null,
    StartTime             int            null,
    StopTime              int            null,
    Description           varchar(20)    null,
    ReverseGeocode        varchar(200)   null,
    NodeId                bigint         not null,
    Name                  varchar(3)     not null,
    DateCreated           int            null,
    Status                varchar(13)    null,
    Note                  varchar(50)    null,
    Contact               varchar(50)    null,
    NoteStatus            varchar(11)    null,
    Implement_TestingDate varchar(40)    null
)
    charset = latin1
    auto_increment = 25;

create table if not exists airsense.manifest_authen
(
    manifestid int auto_increment
        primary key,
    role       varchar(20)                              not null,
    content    varchar(100) collate utf32_vietnamese_ci null,
    created_at datetime                                 not null,
    updated_at datetime                                 not null,
    id_created int                                      not null,
    id_updated int                                      not null,
    deleteflag int                                      not null,
    oldid      int                                      not null
)
    charset = latin1
    auto_increment = 10;

create table if not exists airsense.oauthen2
(
    id          int auto_increment
        primary key,
    manifestid  int                                      not null,
    userid      int                                      not null,
    tocken      varchar(256) collate utf32_vietnamese_ci null,
    created_at  datetime                                 not null,
    updated_at  datetime                                 not null,
    id_updated  int                                      not null,
    id_created  int                                      not null,
    deleteflag  int                                      not null,
    oldid       int                                      null,
    time_relase timestamp default CURRENT_TIMESTAMP      not null on update CURRENT_TIMESTAMP
)
    charset = latin1
    auto_increment = 15;

create table if not exists airsense.oauthen2customer
(
    id             int                                      not null
        primary key,
    permission_id  int                                      not null,
    customer_id    int                                      not null,
    tocken         varchar(256) collate utf32_vietnamese_ci null,
    value_manifest varchar(256) collate utf32_vietnamese_ci not null,
    created_at     datetime                                 not null,
    updated_at     datetime                                 not null,
    id_created     int                                      not null,
    id_updated     int                                      not null,
    deleteflag     int                                      not null,
    time_relase    timestamp default CURRENT_TIMESTAMP      not null on update CURRENT_TIMESTAMP,
    oldid          int                                      null
)
    charset = latin1;

create table if not exists airsense.oauthen2design
(
    id           int auto_increment
        primary key,
    deviceid     int                                      not null,
    userid       int                                      not null,
    link         varchar(200) collate utf32_vietnamese_ci null,
    tocken       varchar(256) collate utf32_vietnamese_ci null,
    created_at   datetime                                 not null,
    updated_at   datetime                                 not null,
    time_release datetime                                 not null,
    id_created   int                                      not null,
    id_updated   int                                      not null,
    deleteflag   int                                      not null,
    oldid        int                                      not null
)
    charset = latin1;

create table if not exists airsense.oauthen2design_data
(
    id         int auto_increment
        primary key,
    userid     int                                      not null,
    link       varchar(200) collate utf32_vietnamese_ci null,
    tocken     varchar(256) collate utf32_vietnamese_ci null,
    linkfile   varchar(200) collate utf32_vietnamese_ci null,
    created_at datetime                                 not null,
    updated_at datetime                                 not null,
    id_created int                                      not null,
    id_updated int                                      not null,
    deleteflag int                                      not null,
    oldid      int                                      not null
)
    charset = latin1;

create table if not exists airsense.orders_sale
(
    orderid         int auto_increment
        primary key,
    saleid          int                                      not null,
    user_aproved_id int                                      not null,
    shipperid       int                                      not null,
    content         varchar(256) collate utf32_vietnamese_ci null,
    weight          float                                    not null,
    width           float                                    not null,
    height          float                                    not null,
    length          float                                    not null,
    created_at      datetime                                 not null,
    updated_at      datetime                                 not null,
    id_created      int                                      not null,
    id_updated      int                                      not null,
    deleteflag      int                                      not null,
    oldid           int                                      not null
)
    charset = latin1;

create table if not exists airsense.orders_sale_historyshiper
(
    id              int auto_increment
        primary key,
    orderid         int                                      not null,
    user_save_id    int                                      not null,
    user_aproved_id int                                      not null,
    shipperid       int                                      not null,
    location        varchar(256) collate utf32_vietnamese_ci null,
    adressid        int                                      not null,
    created_at      datetime                                 not null,
    updated_at      datetime                                 not null,
    id_created      int                                      not null,
    id_updated      int                                      not null,
    deleteflag      int                                      not null,
    oldid           int                                      not null
)
    charset = latin1;

create table if not exists airsense.setup_device
(
    setupid       int auto_increment
        primary key,
    user_setup_id int                                      not null,
    customerid    int                                      not null,
    note          varchar(256) collate utf32_vietnamese_ci null,
    created_at    datetime                                 not null,
    updated_at    datetime                                 not null,
    id_created    int                                      not null,
    id_updated    int                                      not null,
    deleteflag    int                                      not null,
    oldid         int                                      not null
)
    charset = latin1;

create table if not exists airsense.setup_device_bill
(
    id         int auto_increment
        primary key,
    deviceid   int      not null,
    setupid    int      not null,
    km         float    not null,
    created_at datetime not null,
    updated_at datetime not null,
    id_created int      not null,
    id_updated int      not null,
    deleteflag int      not null,
    oldid      int      not null
)
    charset = latin1;

create table if not exists airsense.sparc_access_location_sensor
(
    id_access  int                                     not null
        primary key,
    userid     int                                     not null,
    id_group   int                                     not null,
    station_id varchar(50) collate utf32_vietnamese_ci null,
    manifestid int                                     not null,
    created_at datetime                                not null,
    updated_at datetime                                not null,
    id_created int                                     not null,
    id_updated int                                     not null,
    deleteflag int                                     not null,
    oldid      int                                     not null
)
    charset = latin1;

create table if not exists airsense.sparc_aqi
(
    time       int    not null,
    station_id bigint not null
        primary key,
    aqi        int    null,
    SO2_aqi    float  null,
    PM25_aqi   float  null,
    PM10_aqi   float  null,
    NO2_aqi    float  null,
    PM1_aqi    float  null,
    CO_aqi     float  null,
    O3_aqi     float  null,
    CO2_aqi    float  null
)
    charset = latin1;

create table if not exists airsense.sparc_group_location_sensor
(
    id_group   int auto_increment
        primary key,
    name_group varchar(256) collate utf32_vietnamese_ci null,
    created_at datetime                                 not null,
    updated_at datetime                                 not null,
    id_updated datetime                                 not null,
    id_created datetime                                 not null,
    deleteflag int                                      not null,
    oldid      int                                      not null
)
    charset = latin1;

create table if not exists airsense.sparc_location_sensor
(
    id            int                                      not null
        primary key,
    mac           varchar(30) collate utf32_vietnamese_ci  null,
    station_id    varchar(50) collate utf32_vietnamese_ci  null,
    location_lat  float                                    not null,
    location_long float                                    not null,
    adress        varchar(256) collate utf32_vietnamese_ci null,
    content       varchar(256) collate utf32_vietnamese_ci null,
    created_at    datetime                                 not null,
    updated_at    datetime                                 not null,
    id_created    int                                      not null,
    id_updated    int                                      not null,
    deleteflag    int                                      not null,
    oldid         int                                      not null,
    id_group      int                                      null
)
    charset = latin1;

create table if not exists airsense.sparc_posts
(
    ID                    int                                       not null
        primary key,
    post_author           int                                       not null,
    post_date             datetime                                  null,
    post_date_gmt         datetime                                  null,
    post_content          varchar(8000) collate utf32_vietnamese_ci null,
    post_title            varchar(256) collate utf32_vietnamese_ci  null,
    post_excerpt          varchar(40)                               null,
    post_status           varchar(40) collate utf32_vietnamese_ci   null,
    comment_status        varchar(20) collate utf32_vietnamese_ci   null,
    ping_status           varchar(40)                               null,
    post_password         varchar(40)                               null,
    post_name             varchar(40)                               null,
    to_ping               varchar(40)                               null,
    pinged                varchar(40)                               null,
    post_modified         datetime                                  null,
    post_modified_gmt     datetime                                  null,
    post_content_filtered varchar(40)                               null,
    post_parent           int                                       null,
    guid                  varchar(100)                              null,
    menu_order            int                                       null,
    post_type             varchar(11)                               null,
    post_mime_type        varchar(20)                               null,
    comment_count         int                                       null,
    image_intro           varchar(100)                              null,
    content_intro         varchar(256)                              null,
    deleteflag            int                                       null,
    oldid                 int                                       not null
)
    charset = latin1;

create table if not exists airsense.sparc_sensor_data
(
    station_id  bigint not null,
    Time        int    not null
        primary key,
    PM2p5       float  not null,
    PM10        float  not null,
    PM1         float  not null,
    Temperature float  not null,
    Humidity    float  not null,
    Pressure    float  null,
    SO2         float  null,
    NO2         float  null,
    CO2         float  null,
    CO          float  null,
    O3          float  null,
    NO2A        float  null,
    NO2W        float  null,
    O3W         float  null,
    O3A         float  null,
    COW         float  null,
    COA         float  null,
    SO2W        float  null,
    SO2A        float  null
)
    charset = latin1;

create table if not exists airsense.sparc_sensor_max_min
(
    id                int auto_increment
        primary key,
    station_id        varchar(40) collate utf32_vietnamese_ci null,
    pm25_max          float                                   not null,
    pm25_min          float                                   not null,
    pm25_max_enanble  tinyint(1)                              not null,
    pm25_min_enanble  tinyint(1)                              not null,
    pm10_max          float                                   not null,
    pm10_min          float                                   not null,
    pm10_max_enanble  tinyint(1)                              not null,
    pm10_min_enanble  tinyint(1)                              not null,
    pm1_max           float                                   not null,
    pm1_min           float                                   not null,
    pm1_max_enanble   tinyint(1)                              not null,
    pm1_min_enanble   tinyint(1)                              not null,
    temp_max          float                                   not null,
    temp_min          float                                   not null,
    temp_max_enanble  tinyint(1)                              not null,
    temp_min_enanble  tinyint(1)                              not null,
    humid_max         float                                   not null,
    humid_min         float                                   not null,
    humid_max_enanble tinyint(1)                              not null,
    humid_min_enanble tinyint(1)                              not null,
    special           int                                     not null,
    created_at        datetime                                not null,
    updated_at        datetime                                not null,
    id_created        int                                     not null,
    id_updated        int                                     not null,
    deleteflag        int                                     not null,
    oldid             int                                     not null
)
    charset = latin1
    auto_increment = 2;

create table if not exists airsense.sparc_sensor_warning
(
    id         int auto_increment
        primary key,
    station_id int                                       not null,
    content    varchar(1024) collate utf32_vietnamese_ci null,
    created_at datetime                                  not null,
    updated_at datetime                                  not null,
    id_created int                                       not null,
    id_updated int                                       not null,
    deleteflag int                                       not null,
    oldid      int                                       not null
)
    charset = latin1;

create table if not exists airsense.status_history_device
(
    id         int auto_increment
        primary key,
    deviceid   int                                       not null,
    content    varchar(2000) collate utf32_vietnamese_ci null,
    note       varchar(100) collate utf32_vietnamese_ci  null,
    created_at datetime                                  not null,
    updated_at datetime                                  not null,
    id_created int                                       not null,
    id_updated int                                       not null,
    deleteflag int                                       not null,
    oldid      int                                       not null
)
    charset = latin1;

create table if not exists airsense.user_manifest
(
    id            int auto_increment
        primary key,
    userid        int                                     not null,
    type_manifest int                                     not null,
    username      varchar(50) collate utf32_vietnamese_ci null,
    password      varchar(50) collate utf32_vietnamese_ci null,
    created_at    datetime                                not null,
    updated_at    datetime                                not null,
    id_created    int                                     not null,
    id_updated    int                                     not null,
    deleteflag    int                                     not null,
    oldid         int                                     not null
)
    charset = latin1;

create table if not exists airsense.users
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
    created_at  datetime                                 not null,
    updated_at  datetime                                 not null,
    id_created  int                                      not null,
    id_updated  int                                      not null,
    note        varchar(30) collate utf32_vietnamese_ci  null,
    manifestid  int                                      not null,
    deleteflag  int                                      null
)
    charset = latin1;

create table if not exists airsense.warehouse_product
(
    warehouseid  int auto_increment
        primary key,
    productid    int                                      not null,
    cost_in      float                                    not null,
    content      varchar(256) collate utf32_vietnamese_ci null,
    id_user_send int                                      not null,
    id_adress    int                                      not null,
    deviceid     int                                      not null,
    created_at   datetime                                 not null,
    updated_at   datetime                                 not null,
    id_created   int                                      not null,
    id_updated   int                                      not null,
    deleteflag   int                                      not null,
    oldid        int                                      not null
)
    charset = latin1;

create table if not exists airsense.wp_comments
(
    comment_ID           int auto_increment
        primary key,
    comment_post_ID      int                                     not null,
    comment_author       varchar(40) collate utf32_vietnamese_ci null,
    comment_author_email varchar(40)                             not null,
    comment_author_url   varchar(40)                             not null,
    comment_author_IP    varchar(20)                             not null,
    comment_date         datetime                                not null,
    comment_date_gmt     datetime                                not null,
    comment_content      varchar(1000)                           not null,
    comment_karma        int                                     not null,
    comment_approved     varchar(10)                             not null,
    comment_agent        varchar(100)                            not null,
    comment_type         varchar(10)                             not null,
    comment_parent       int                                     not null,
    user_ID              int                                     not null
)
    charset = latin1;

create table if not exists airsense.wp_ninja_table_items
(
    id         int                                     not null
        primary key,
    position   varchar(40) collate utf32_vietnamese_ci null,
    table_id   int                                     not null,
    owner_id   int                                     not null,
    attribute  varchar(20)                             not null,
    settings   varchar(20)                             null,
    value      varchar(40) collate utf32_vietnamese_ci null,
    created_at datetime                                not null,
    updated_at datetime                                not null,
    id_created int                                     not null,
    id_updated int                                     not null,
    deleteflag int                                     not null,
    oldid      int                                     not null
)
    charset = latin1;

create table if not exists airsense.wp_options
(
    option_id    int                                     not null
        primary key,
    option_name  varchar(40) collate utf32_vietnamese_ci null,
    option_value varchar(40) collate utf32_vietnamese_ci null,
    autoload     varchar(5)                              not null
)
    charset = latin1;

create table if not exists airsense.wp_postmeta
(
    meta_id    int                                      not null
        primary key,
    post_id    int                                      not null,
    meta_key   varchar(40) collate utf32_vietnamese_ci  null,
    meta_value varchar(100) collate utf32_vietnamese_ci null
)
    charset = latin1;

create table if not exists airsense.wp_term_relationships
(
    object_id        int not null
        primary key,
    term_taxonomy_id int not null,
    term_order       int not null
)
    charset = latin1;

create table if not exists airsense.wp_term_taxonomy
(
    term_taxonomy_id int                                     not null
        primary key,
    term_id          int                                     not null,
    taxonomy         varchar(20) collate utf32_vietnamese_ci null,
    description      varchar(40) collate utf32_vietnamese_ci null,
    parent           int                                     not null,
    count            int                                     not null
)
    charset = latin1;

create table if not exists airsense.wp_terms
(
    term_id    int                                     not null
        primary key,
    name       varchar(40) collate utf32_vietnamese_ci null,
    slug       varchar(40) collate utf32_vietnamese_ci null,
    term_group int                                     not null
)
    charset = latin1;

create table if not exists airsense.wp_usermeta
(
    umeta_id   int                                      not null
        primary key,
    user_id    int                                      not null,
    meta_key   varchar(40) collate utf32_vietnamese_ci  null,
    meta_value varchar(100) collate utf32_vietnamese_ci null
)
    charset = latin1;

create table if not exists airsense.wp_users
(
    ID                  int                                     not null
        primary key,
    user_login          varchar(20) collate utf32_vietnamese_ci null,
    user_pass           varchar(40) collate utf32_vietnamese_ci null,
    user_nicename       varchar(15) collate utf32_vietnamese_ci null,
    user_email          varchar(20) collate utf32_vietnamese_ci null,
    user_url            varchar(30) collate utf32_vietnamese_ci null,
    user_registered     varchar(20) collate utf32_vietnamese_ci null,
    user_activation_key datetime                                not null,
    user_status         int                                     not null,
    display_name        varchar(20) collate utf32_vietnamese_ci null
)
    charset = latin1;

