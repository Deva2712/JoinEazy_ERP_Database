/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Replace these with UUIDs from the 'users' table.
		 */
		const requesterId = "USER_ID_OF_PROFESSOR";
		const substituteId = "USER_ID_OF_COLLEAGUE";

		await queryInterface.bulkInsert("leaves", [
			{
				id: "111a9511-f30c-52e5-b827-557766551111",
				userId: requesterId,
				type: "Casual Leave",
				startDate: "2026-06-01",
				endDate: "2026-06-03",
				reason: "Family event in hometown.",
				substituteId: substituteId,
				substitutionStatus: "Accepted",
				status: "Approved",
				remarks: "Approved by HoD. Substitution confirmed.",
				isArchived: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "222b0622-g41d-63f6-c938-668877662222",
				userId: requesterId,
				type: "Sick Leave",
				startDate: "2026-06-15",
				endDate: "2026-06-15",
				reason: "Medical appointment.",
				substituteId: substituteId,
				substitutionStatus: "Pending",
				status: "Pending",
				remarks: null,
				isArchived: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("leaves", null, {});
	},
};