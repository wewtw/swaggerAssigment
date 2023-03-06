const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

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
}
/**
 * @swagger
 * /restaurants:
 *  get:
 *      summary: get all restaurants
 *      produces:
 *          application/json
 *  responses:
 *      200: success
 *      description : an array of restaurants
 *      schema:
 *          $ref: "#definitions/restaurant"
 * definitions:
 *  restaurant:
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 * 
 * 
 */


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.get("/restaurants", (req,res)=>{
    res.send(restaurants);
})

/**
 * @swagger
 * /restaurant:
 *  post:
 *      summary: add a restaurant
 *      requestBody:
 *          $ref: '#/components/requestBodies/RestaurantBody'
 *      required:
 *          -id:
 *          -name:
 * responses:
 *          200:
 *              description: created restaurant
 *
 * definitions:
 *  restaurant:
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 * components:
 *  requestBodies:
 *      RestaurantBody:
 *          description: A JSON object of restaurant information
 *          required: true
 *          content:
 *              application/json:
 *              schema:
 *                  $ref: '#/definitions/restaurant'
 *       
 */



app.post('/restaurant', (req, res) => {
  const restaurant = { id: restaurants.length, name: req.body.name };
  restaurants.push(restaurant);
  res.status(200).json(restaurant);
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
 *        
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

app.listen(4000,()=>console.log('Listening on 4000'))
