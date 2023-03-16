INSERT INTO users (name, email, password_hash, birthdate, sex)
VALUES ('Sample User', 'example@example.com', '123', '1996-08-13', 'female' );


INSERT INTO userDetails (weight, height, weight_units, measurement_units, body_fat_percentage, enable_body_fat_calculation, enable_weight_change_calculation, main_goal)
VALUES (150, 170, "lb", "cm", 25, false, true, "lose fat");


INSERT INTO user_edits (user_id, user_Details)
VALUES (0,0);


INSERT INTO habitGoals (name)
VALUES ("Eat more Vegetables");


INSERT INTO habitGoal_logs (goal_id, user_id)
VALUES (0, 0);


INSERT INTO foods (name, grams_per_serving, carbs, fat, protein)
VALUES ();

INSERT INTO meals (name)
VALUES ("Breakfast");

INSERT INTO food_logs (food_id, user_id, meal_id, servings)
VALUES (0, 0, 0, 0);
