const categoriesService = require('../services/categories.service');
module.exports= {
    getAllCategories: async (req,res) => {
        const result = await categoriesService.getAllCategories();
        return res.status(200).json({
            "categories": result
        })
    }
}