const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var restaurants = [{id:0,name:"Woodshill"},{id:1,name:"Fiorellas"}]

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Restaurants API",
            version: "1.0.0"
        }
    },
    apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of restaurants
 *         schema:
 *           $ref: "#/definitions/Restaurant"
 */
app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

/**
 * @swagger
 * /restaurant:
 *   post:
 *     summary: Add a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/RestaurantInput"
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Created a new restaurant
 *         schema:
 *           $ref: "#/definitions/Restaurant"
 * 
 * definitions:
 *   Restaurant:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *   RestaurantInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 */
app.post('/restaurant', (req, res) => {
  const restaurant = { id: restaurants.length, name: req.body.name };
  restaurants.push(restaurant);
  res.status(201).json(restaurant);
});

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the restaurant to delete
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Restaurants left after deleting
 *         schema:
 *           $ref: "#/definitions/RestaurantList"
 * 
 * definitions:
 *   RestaurantList:
 *     type: object
 *     properties:
 *       restaurants:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Restaurant"
 */
app.delete('/restaurants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  restaurants = restaurants.filter((restaurant) => restaurant.id !== id);
  res.json({ restaurants });
});

 /**
 * @swagger
 * /restaurant/{id}:
 *   put:
 *     summary: Update a restaurant by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the restaurant to update
 *         in: path
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/restaurant'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/restaurant'
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 * 
 */

app.put("/restaurant/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const restaurantToUpdate = restaurants.find(item => item.id === id);

    if (!restaurantToUpdate) {
      res.status(404).json({ message: "Restaurant not found" });
    } else {
      restaurantToUpdate.name = req.body.name;
      res.json(restaurantToUpdate);
    }
});


