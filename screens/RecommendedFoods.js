import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { getRecommendedFoodsThunk } from '../components/store/recommendedFoods';
import { connect } from 'react-redux';
import FoodCard from '../components/FoodCard';
import { Button } from 'react-native-elements';
import { postFood } from '../components/store/meals';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
  },
});

const FoodButton = props => {
  return (
    <Button
      style={styles.button}
      title={props.title}
      type={props.state === props.title ? 'outline' : 'solid'}
      onPress={() => props.handlePress(props.title)}
    />
  );
};

const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
class RecommendedFoods extends React.Component {
  constructor() {
    super();
    this.state = {
      activeButton: 'Breakfast',
    };
    this.handlePress = this.handlePress.bind(this);
    this.postFood = this.postFood.bind(this);
  }
  componentDidMount() {
    this.handlePress(this.state.activeButton);
  }

  postFood(food, mealId) {
    let newFood = {
      food_name: food.food_name,
      calories: food.calories,
      fat: food.fat,
      protein: food.protein,
      carbohydrates: food.carbohydrates,
      weight: food.weight,
      servingSize: food.servingSize,
    };
    let quantity = 1;
    let grams = 0;
    this.props.postFood(newFood, mealId, quantity, grams)

    this.props.navigation.pop();
    this.props.navigation.pop();
  }
  async handlePress(evt) {
    const dailyGoals = this.props.user.dailyGoal;

    const todayMeal = this.props.meals.todaysMeals.filter(meal => {
      return meal.entreeType === evt ? meal : null;
    })[0];

    const food = {
      calories: dailyGoals.calorieLimit / 4 - todayMeal.totalCalories,
      carbs: dailyGoals.carbLimit / 4 - todayMeal.totalCarbs,
      protein: dailyGoals.proteinLimit / 4 - todayMeal.totalProtein,
      fat: dailyGoals.fatLimit / 4 - todayMeal.totalFat,
    };

    await this.props.getRecs(food);
    this.setState({
      activeButton: evt,
    });
  }
  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          {meals.map((meal, idx) => (
            <FoodButton
              key={idx}
              title={meal}
              handlePress={this.handlePress}
              state={this.state.activeButton}
            />
          ))}
        </View>
        <ScrollView>
          {this.props.recommendedFoods.length
            ? this.props.recommendedFoods.map(food => (
                <FoodCard
                  key={food.id}
                  food={food}
                  mealType={this.state.activeButton}
                  postFood={this.postFood}
                />
              ))
            : null}
        </ScrollView>
      </View>
    );
  }
}

RecommendedFoods.navigationOptions = {
  headerTitle: 'Recommended Foods',
  headerStyle: {
    backgroundColor: 'crimson',
  },
  headerTintColor: 'white',
};

const mapState = state => {
  return {
    user: state.user,
    recommendedFoods: state.recommendedFoods,
    meals: state.meals,
  };
};
const mapDispatch = dispatch => {
  return {
    getRecs: food => dispatch(getRecommendedFoodsThunk(food)),
    postFood: (food, mealId, quantity, grams) =>
      dispatch(postFood(food, mealId, quantity, grams)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(RecommendedFoods);
