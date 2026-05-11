"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Replace 'USER_ID_FROM_USERS_TABLE' with
		 * a UUID that actually exists in 'users' table.
		 */
		const activeUserId = "USER_ID_FROM_USERS_TABLE";

		await queryInterface.bulkInsert(
			"payrolls",
			[
				{
					id: "550e8400-e29b-41d4-a716-446655440000", // Example static UUID
					payrollId: "PAY-JAN-2026",
					userId: activeUserId,
					month: "January",
					amount: 5200.0,
					status: "Paid",
					paidAt: new Date("2026-01-31"),
					breakdown: JSON.stringify({
						earnings: [
							{ description: "Monthly Base", amount: 5000 },
							{ description: "Travel Allowance", amount: 200 },
						],
						deductions: [
							{ description: "Tax Deduction", amount: 1000 },
						],
						netPay: 4200,
					}),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("payrolls", null, {});
	},
};
