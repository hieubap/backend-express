/* Replace with your SQL commands */
INSERT INTO airsense.user (name, full_name, phone_number, email, password, contact, avatar, created_at, updated_at,
                           created_id, updated_id, note, deleted_at)
/* raw password : 123456aA@ */
VALUES ('admin', 'admin', '0389444312', 'admin@gmail.com', 'c030437f6e8e94d244bc602606df5235', null, null, DEFAULT, DEFAULT, null, null, null,
        null);
INSERT INTO airsense.user_ref_manifest (user_id, manifest_id, created_at, updated_at, created_id, updated_id,
                                        deleted_at)
VALUES (1, 1, DEFAULT, DEFAULT, null, null, null);

INSERT INTO airsense.manifest_ref_permission (manifest_id, permission_id, created_at, updated_at, deleted_at)
VALUES (1, 1, DEFAULT, DEFAULT, null);

INSERT INTO airsense.manifest_ref_permission (manifest_id, permission_id, created_at, updated_at, deleted_at)
VALUES (1, 2, DEFAULT, DEFAULT, null);

INSERT INTO airsense.manifest_ref_permission (manifest_id, permission_id, created_at, updated_at, deleted_at)
VALUES (1, 3, DEFAULT, DEFAULT, null);

INSERT INTO airsense.manifest_ref_permission (manifest_id, permission_id, created_at, updated_at, deleted_at)
VALUES (1, 4, DEFAULT, DEFAULT, null);

INSERT INTO airsense.manifest_ref_permission (manifest_id, permission_id, created_at, updated_at, deleted_at)
VALUES (1, 5, DEFAULT, DEFAULT, null);

INSERT INTO airsense.manifest_ref_permission (manifest_id, permission_id, created_at, updated_at, deleted_at)
VALUES (1, 6, DEFAULT, DEFAULT, null);

