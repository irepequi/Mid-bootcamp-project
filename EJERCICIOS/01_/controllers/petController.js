const connection = require("../config/db");
class PetController {
  // Muestra la vista principal (home) con todas las mascotas

  showHome = (req, res) => {
    let sql = `SELECT * FROM pet WHERE deleted = 0`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result });
    });
  };

  // Muestra el formulario de crear mascotas
  showForm = (req, res) => {
    let customer_id = req.params.customer_id;
    res.render("petForm", { customer_id });
  };

  // Guarda una nueva mascotas
  savePet = (req, res) => {
    let { pet_name, category } = req.body;
    let customer_id = req.params.customer_id;

    let sql = `INSERT INTO pet (pet_name, category, customer_id) VALUES ('${pet_name}', '${category}', '${customer_id}') `;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO pet (pet_name, category, customer_id, pet_img) VALUES ('${pet_name}', '${category}', '${customer_id}', '${img}') `;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/customer/oneCustomer/${customer_id}`);
    });
  };

  // Muestra el formulario de edición de mascotas

  showEditPetForm = (req, res) => {
    let pet_id = req.params.pet_id;
    let sql = `SELECT * FROM pet WHERE pet_id = ${pet_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editPet", { result });
    });
  };

  // Guarda los cambios del formulario de edición de mascotas

  saveChangesPet = (req, res) => {
    let { pet_name, category } = req.body;
    let { pet_id, customer_id } = req.params;
    let sql = `UPDATE pet SET pet_name = '${pet_name}', category = '${category}' WHERE pet_id = ${pet_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE pet SET pet_name = '${pet_name}', category = '${category}', pet_img = '${img}' WHERE pet_id = ${pet_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/customer/oneCustomer/${customer_id}`);
    });
  };

  // Elimina de manera real una mascotas
  deletePet = (req, res) => {
    let { pet_id, customer_id } = req.params;
    let sql = `DELETE FROM pet WHERE pet_id = ${pet_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/customer/oneCustomer/${customer_id}`);
    });
  };

  // Elimina de manera lógica una mascota
  logicDeletePet = (req, res) => {
    let { pet_id, customer_id } = req.params;
    let sql = `UPDATE pet SET deleted = 1 WHERE pet_id = ${pet_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/customer/oneCustomer/${customer_id}`);
    });
  };
}

module.exports = new PetController();
