const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { isValidId, validateBody } = require("../../middlewares");

const { addSchema, updateFavoriteSchema } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put("/:contactId", isValidId, validateBody(addSchema), ctrl.updateById);

router.patch(
    "/:contactId/favorite",
    validateBody(updateFavoriteSchema),
    isValidId,
    ctrl.updateStatusContact
);

module.exports = router;
