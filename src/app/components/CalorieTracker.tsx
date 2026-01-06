import React, { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Search, 
  Plus, 
  TrendingDown, 
  AlertTriangle,
  Star,
  Clock,
  X,
  ChevronRight
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  icon: string;
  category: 'protein' | 'carb' | 'vegetable' | 'fruit' | 'dairy' | 'other';
}

interface LoggedFood extends FoodItem {
  timestamp: string;
}

const mockFoods: FoodItem[] = [
  { id: '1', name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, icon: '🍗', category: 'protein' },
  { id: '2', name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8, icon: '🍚', category: 'carb' },
  { id: '3', name: 'Broccoli (1 cup)', calories: 55, protein: 4, carbs: 11, fat: 0.6, icon: '🥦', category: 'vegetable' },
  { id: '4', name: 'Greek Yogurt (1 cup)', calories: 100, protein: 17, carbs: 6, fat: 0.7, icon: '🥛', category: 'dairy' },
  { id: '5', name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13, icon: '🐟', category: 'protein' },
  { id: '6', name: 'Sweet Potato (medium)', calories: 103, protein: 2.3, carbs: 24, fat: 0.2, icon: '🍠', category: 'carb' },
  { id: '7', name: 'Eggs (2 large)', calories: 140, protein: 12, carbs: 1, fat: 10, icon: '🥚', category: 'protein' },
  { id: '8', name: 'Avocado (half)', calories: 120, protein: 1.5, carbs: 6, fat: 11, icon: '🥑', category: 'other' },
  { id: '9', name: 'Banana (medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, icon: '🍌', category: 'fruit' },
  { id: '10', name: 'Oatmeal (1 cup)', calories: 166, protein: 6, carbs: 28, fat: 3.6, icon: '🥣', category: 'carb' },
  { id: '11', name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14, icon: '🥜', category: 'other' },
  { id: '12', name: 'Pasta (1 cup)', calories: 221, protein: 8, carbs: 43, fat: 1.3, icon: '🍝', category: 'carb' },
  { id: '13', name: 'Latte (medium)', calories: 190, protein: 10, carbs: 18, fat: 7, icon: '☕', category: 'dairy' },
  { id: '14', name: 'Apple (medium)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, icon: '🍎', category: 'fruit' },
  { id: '15', name: 'Turkey Breast (100g)', calories: 135, protein: 30, carbs: 0, fat: 0.7, icon: '🦃', category: 'protein' },
];

export function CalorieTracker() {
  const [dailyLimit] = useState(2000);
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [favorites] = useState<string[]>(['1', '5', '7', '10']); // IDs of favorite foods

  const totalCalories = loggedFoods.reduce((sum, food) => sum + food.calories, 0);
  const remaining = dailyLimit - totalCalories;
  const percentageUsed = (totalCalories / dailyLimit) * 100;
  const isOverLimit = totalCalories > dailyLimit;
  const isNearLimit = percentageUsed >= 80 && !isOverLimit;

  const totalProtein = loggedFoods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = loggedFoods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = loggedFoods.reduce((sum, food) => sum + food.fat, 0);

  const penaltyAmount = isOverLimit ? Math.floor((totalCalories - dailyLimit) / 100) * 5 : 0;

  const getStatusColor = () => {
    if (isOverLimit) return '#ef4444';
    if (isNearLimit) return '#f59e0b';
    return '#0ea5e9';
  };

  const getStatusGlow = () => {
    if (isOverLimit) return 'rgba(239, 68, 68, 0.6)';
    if (isNearLimit) return 'rgba(245, 158, 11, 0.6)';
    return 'rgba(14, 165, 233, 0.6)';
  };

  const handleAddFood = (food: FoodItem) => {
    const loggedFood: LoggedFood = {
      ...food,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setLoggedFoods(prev => [...prev, loggedFood]);
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleRemoveFood = (index: number) => {
    setLoggedFoods(prev => prev.filter((_, i) => i !== index));
  };

  const filteredFoods = searchQuery
    ? mockFoods.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockFoods;

  const recentFoods = loggedFoods.slice(-3).map(lf => lf.id);
  const favoriteFoods = mockFoods.filter(f => favorites.includes(f.id));

  // Calculate ring properties
  const strokeWidth = 12;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentageUsed / 100) * circumference;

  return (
    <div className="calorie-tracker">
      <GlassPanel className="mb-6">
        <h1 className="page-title flex items-center gap-2">
          <Flame className="w-7 h-7 text-orange-400" />
          Nutrition Tracker
        </h1>
        <p className="page-subtitle">Monitor your daily caloric intake</p>
      </GlassPanel>

      {/* Calorie Ring */}
      <GlassPanel className="mb-6">
        <div className="calorie-ring-container">
          <svg className="calorie-ring" width="200" height="200">
            {/* Background ring */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={strokeWidth}
            />
            {/* Progress ring */}
            <motion.circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={getStatusColor()}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '100px 100px',
                filter: `drop-shadow(0 0 10px ${getStatusGlow()})`
              }}
              initial={{ strokeDashoffset: circumference }}
              animate={{ 
                strokeDashoffset,
                stroke: getStatusColor()
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          
          <div className="calorie-ring-center">
            <div className="calorie-ring-label">
              {isOverLimit ? 'Over Limit' : 'Remaining'}
            </div>
            <div 
              className="calorie-ring-value"
              style={{ color: getStatusColor() }}
            >
              {Math.abs(remaining)}
            </div>
            <div className="calorie-ring-sublabel">
              {totalCalories} / {dailyLimit} cal
            </div>
          </div>
        </div>

        {/* Macros Summary */}
        <div className="macros-grid">
          <div className="macro-card">
            <div className="macro-label">Protein</div>
            <div className="macro-value">{Math.round(totalProtein)}g</div>
          </div>
          <div className="macro-card">
            <div className="macro-label">Carbs</div>
            <div className="macro-value">{Math.round(totalCarbs)}g</div>
          </div>
          <div className="macro-card">
            <div className="macro-label">Fat</div>
            <div className="macro-value">{Math.round(totalFat)}g</div>
          </div>
        </div>
      </GlassPanel>

      {/* Penalty Warning */}
      <AnimatePresence>
        {isOverLimit && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          >
            <GlassPanel 
              className="penalty-warning"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}
            >
              <div className="penalty-header">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <div className="penalty-title">⚠️ Calorie Limit Exceeded</div>
              </div>
              <p className="penalty-description">
                System penalty applied. Immediate stat reductions in effect.
              </p>
              <div className="penalty-stats">
                <div className="penalty-stat-item">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span>Discipline −{penaltyAmount} EXP</span>
                </div>
                <div className="penalty-stat-item">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span>Physical −{penaltyAmount} EXP</span>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Food Button */}
      {!showSearch && (
        <motion.button
          className="add-food-button"
          onClick={() => setShowSearch(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Log Food
        </motion.button>
      )}

      {/* Food Search Panel */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <GlassPanel className="mb-6 food-search-panel">
              <div className="food-search-header">
                <h3 className="section-title">Log Food</h3>
                <button
                  className="close-search-button"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="search-bar">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search food (e.g. chicken breast, pasta, latte)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                />
              </div>

              {/* Favorites Section */}
              {!searchQuery && favoriteFoods.length > 0 && (
                <div className="favorites-section">
                  <div className="favorites-header">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="favorites-label">Favorites</span>
                  </div>
                  <div className="food-list">
                    {favoriteFoods.map((food) => (
                      <FoodCard key={food.id} food={food} onAdd={handleAddFood} />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Foods */}
              {!searchQuery && recentFoods.length > 0 && (
                <div className="recent-section">
                  <div className="recent-header">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="recent-label">Recently Logged</span>
                  </div>
                  <div className="food-list">
                    {mockFoods
                      .filter(f => recentFoods.includes(f.id))
                      .map((food) => (
                        <FoodCard key={food.id} food={food} onAdd={handleAddFood} />
                      ))}
                  </div>
                </div>
              )}

              {/* All Foods / Search Results */}
              <div className="all-foods-section">
                {searchQuery && (
                  <div className="search-results-header">
                    {filteredFoods.length} result{filteredFoods.length !== 1 ? 's' : ''}
                  </div>
                )}
                <div className="food-list">
                  {filteredFoods.map((food) => (
                    <FoodCard key={food.id} food={food} onAdd={handleAddFood} />
                  ))}
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today's Log */}
      {loggedFoods.length > 0 && (
        <GlassPanel>
          <h3 className="section-title mb-4">Today's Log</h3>
          <div className="logged-foods-list">
            {loggedFoods.map((food, index) => (
              <motion.div
                key={`${food.id}-${index}`}
                className="logged-food-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="logged-food-icon">{food.icon}</div>
                <div className="logged-food-info">
                  <div className="logged-food-name">{food.name}</div>
                  <div className="logged-food-time">{food.timestamp}</div>
                </div>
                <div className="logged-food-calories">{food.calories} cal</div>
                <button
                  className="remove-food-button"
                  onClick={() => handleRemoveFood(index)}
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

interface FoodCardProps {
  food: FoodItem;
  onAdd: (food: FoodItem) => void;
}

function FoodCard({ food, onAdd }: FoodCardProps) {
  return (
    <motion.div
      className="food-card"
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onAdd(food)}
    >
      <div className="food-card-icon">{food.icon}</div>
      <div className="food-card-info">
        <div className="food-card-name">{food.name}</div>
        <div className="food-card-macros">
          <span className="food-macro">P: {food.protein}g</span>
          <span className="food-macro">C: {food.carbs}g</span>
          <span className="food-macro">F: {food.fat}g</span>
        </div>
      </div>
      <div className="food-card-calories">
        <div className="food-card-cal-value">{food.calories}</div>
        <div className="food-card-cal-label">cal</div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-500" />
    </motion.div>
  );
}
