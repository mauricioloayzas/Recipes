import React, { useEffect, useState } from 'react';
import { RecipeTable } from './Components/Recipe/RecipeTable';

const App = () => {
    return (
        <div>
            <h1>Data from Firebase</h1>
            <RecipeTable  />
        </div>
    );
};

export default App;

