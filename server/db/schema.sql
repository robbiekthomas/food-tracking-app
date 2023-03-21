DROP TABLE IF EXISTS users CASCADE; --user
DROP TABLE IF EXISTS userDetails CASCADE; --user
DROP TABLE IF EXISTS habitGoals CASCADE; --goals
DROP TABLE IF EXISTS habitGoal_logs CASCADE; --goals
DROP TABLE IF EXISTS foods CASCADE; --foods
DROP TABLE IF EXISTS meals CASCADE; --foods
DROP TABLE IF EXISTS food_logs CASCADE; --foods

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  birthdate DATE,
  sex VARCHAR(16),
  date_updated DATE DEFAUlT CURRENT_DATE
);

CREATE TABLE userDetails (
  id SERIAL PRIMARY KEY,
  weight SMALLINT NOT NULL,
  height SMALLINT,
  weight_units VARCHAR(2),
  measurement_units VARCHAR(2),
  body_fat_percentage SMALLINT NOT NULL,
  waist_circumference SMALLINT,
  hip_circumference SMALLINT,
  neck_circumference SMALLINT,
  enable_body_fat_calculation BOOLEAN DEFAULT FALSE,
  enable_weight_change_calculation BOOLEAN DEFAULT TRUE, 
  weight_change_goal SMALLINT,
  main_goal VARCHAR(20),
  date_updated DATE DEFAUlT CURRENT_DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);



CREATE TABLE habitGoals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE habitGoal_logs (
  id SERIAL PRIMARY KEY,
  goal_id INTEGER REFERENCES habitGoals(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_complete BOOLEAN DEFAULT FALSE,
  date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  grams_per_serving SMALLINT,
  calories SMALLINT,
  carbs SMALLINT,
  fat SMALLINT,
  protein SMALLINT
);

CREATE TABLE meals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE food_logs (
  id SERIAL PRIMARY KEY,
  food_id INTEGER REFERENCES foods(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
  servings SMALLINT DEFAULT 1,
  hunger_before SMALLINT,
  hunger_after SMALLINT,
  feeling_after_eating VARCHAR(50),
  date DATE DEFAULT CURRENT_DATE
);