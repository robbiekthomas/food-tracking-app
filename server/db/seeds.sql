INSERT INTO users (name, email, birthdate, sex, mode)
VALUES ('Sample User', 'example@example.com', '1996-08-13', 'female', 'precise' );


INSERT INTO userDetails (weight, height, weight_units, measurement_units, body_fat_percentage, enable_body_fat_calculation, enable_weight_change_calculation, main_goal, user_id, weight_change_goal)
VALUES (150, 170, 'lb', 'cm', 25, false, true, 'lose fat', 1, 0);


INSERT INTO habitGoals (goal_name)
VALUES ('Eat at least 20g of protein per meal'),
  ('Eat one green vegetable per meal'),
  ('Have three different fruits throughout the day'),
  ('Eat all meals without distractions'),
  ('Plan your meals the night before'),
  ('Eat whole grains instead of white'),
  ('Have one salad today'),
  ('Have a smoothie with one green vegetable today'),
  ('Stick to scheduled meal times'),
  ('Put your food/utensils down between bites');


INSERT INTO habitGoal_logs (goal_id, user_id)
VALUES (2, 1),
(5, 1),
(3, 1);


INSERT INTO foods (name, grams_per_serving, calories, protein, carbs, fat)
VALUES ('All Natural Peanut Butter', 32, 190, 8, 6, 16),
  ('All Purpose Flour', 120, 455, 13, 95, 1),
  ('Almond Butter', 32, 190, 8, 6, 16),
  ('Almonds', 9.3, 50, 2, 2, 4),
  ('Apple', 182, 104, 1, 28, 0),
  ('Apple Cider Vinegar', 15, 1, 0, 0, 0),
  ('Arugula', 20, 5, 1, 1, 0),
  ('Avocado', 140, 240, 3, 13, 22),
  ('Baby Carrots', 100, 41, 1, 10, 0),
  ('Spinach', 20, 5, 1, 1, 0),
  ('White Bagel', 75, 200, 7, 38, 2),
  ('Whole Grain Bagel', 75, 200,7 ,38 ,2 ),
  ('Banana', 118, 105, 1, 27, 0),
  ('Ginger (Fresh)', 1, 0, 0, 0, 0),
  ('Basil', 1, 0, 0, 0, 0),
  ('G Hughes BBQ Sauce', 32, 10, 0, 2, 0),
  ('Red Bell Pepper', 100, 26, 1, 6, 0),
  ('Green Bell Pepper', 100, 26, 1, 6, 0),
  ('Yellow Bell Pepper', 100, 26, 1, 6, 0),
  ('Orange Bell Pepper', 100, 26, 1, 6, 0),
  ('Black Beans', 200, 182, 12, 33, 1),
  ('Kidney Beans', 200, 182, 12, 33, 1),
  ('Lima Beans', 200, 182, 12, 33, 1),
  ('Red Beans', 200, 182, 12, 33, 1),
  ('Black Olives', 200, 182, 12, 33, 1),
  ('Blackberries', 100, 40, 1, 10, 0),
  ('Blueberries', 100, 40, 1, 10, 0),
  ('Saskatoon Berries', 100, 40, 1, 10, 0),
  ('Broccoli', 100, 34, 3, 7, 0),
  ('Bok Choy', 100, 34, 3, 7, 0),
  ('Brussels Sprouts', 100, 34, 3, 7, 0),
  ('Asparagus', 100, 34, 3, 7, 0),
  ('Brown Rice', 125, 211, 4, 36, 5),
  ('Jasmine Rice', 125, 211, 4, 36, 5),
  ('Sushi Rice', 125, 211, 4, 36, 5),
  ('Basmati Rice', 125, 211, 4, 36, 5),
  ('Buckwheat Soba Noodles', 100, 344, 14, 66, 3),
  ('Soba Noodles', 100, 344, 14, 66, 3),
  ('Vermicelli', 100, 293, 0, 76, 0),
  ('Butter (unsalted)', 10, 72, 0, 0, 8),
  ('Ghee', 10, 88, 0, 0, 10),
  ('Cocao Powder', 14, 60, 3, 9, 2),
  ('Canned Coconut Milk (Full Fat)', 240, 0, 5, 13, 57),
  ('Carrot', 100, 41, 1, 10, 0),
  ('Cashews', 9.3, 50, 2, 2, 4),
  ('Cauliflower', 100, 25, 2, 5, 0),
  ('Cauliflower Rice', 100, 25, 2, 5, 0),
  ('Celery', 40, 6, 0, 2, 0),
  ('Cucumber', 40, 6, 0, 2, 0),
  ('Cheddar Cheese', 25, 103, 6, 1, 9),
  ('Havarti Cheese', 25, 103, 6, 1, 9),
  ('Mozzarella Cheese', 25, 103, 6, 1, 9),
  ('Cherry Tomatoes', 148, 27, 0, 11, 0),
  ('Tomato', 148, 27, 0, 11, 0),
  ('Chia Seeds', 5, 27, 1, 1, 5),
  ('Chicken Broth', 240, 50, 5, 0, 0),
  ('Chicken Breast (Boneless, Skinless)', 120, 198, 37, 0, 4),
  ('Chicken Thighs (Boneless, Skinless)', 120, 198, 37, 0, 4),
  ('Vegetable Broth', 240, 50, 5, 0, 0),
  ('Chickpea Pasta', 57, 190, 12, 32, 3);

INSERT INTO meals (name)
VALUES ('Breakfast'), 
('Lunch'), 
('Snack'), 
('Dinner');

INSERT INTO food_logs (food_id, user_id, meal_id, servings)
VALUES (1, 1, 1, 1);
