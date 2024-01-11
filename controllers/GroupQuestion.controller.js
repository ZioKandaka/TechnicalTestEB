const response = require('../helper/response.js');
const { GroupQuestion } = require('../models/index.js');

class GroupQuestionController {
    static async getColoQuestion(req, res, next) {
        console.info(`GroupQuestionController: getColoQuestion`)
        try {
            let colo = await GroupQuestion.findAll({
                where: {
                    deleted_at: null,
                    is_colo: true
                }
            })

            response(res, 200, true, 'Date fetched', colo)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GroupQuestionController