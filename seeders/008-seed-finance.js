/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Replace 'USER_ID_FROM_USERS_TABLE' with
		 * a valid UUID from the 'users' table.
		 */
		const activeUserId = "USER_ID_FROM_USERS_TABLE";

		await queryInterface.bulkInsert(
			"finance_records",
			[
				{
					id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
					userId: activeUserId,
					type: "expenses",
					title: "Office Stationery",
					amount: 200.0,
					status: "Reimbursed",
					category: "Supplies",
					description:
						"Purchase of highlighters, notebooks, and printer ink.",
					proofDocLink: "https://drive.google.com/file/...",
					adminComments: "Receipts verified. Reimbursed via payroll.",
					approvalTime: new Date("2026-01-22"),
					createdAt: new Date("2026-01-20"),
					updatedAt: new Date("2026-01-22"),
				},
				{
					id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
					userId: activeUserId,
					type: "advances",
					title: "Research Trip to Delhi",
					amount: 5000.0,
					status: "Approved",
					category: "Travel",
					description:
						"Advance for flight tickets and local conveyance.",
					proofDocLink: "https://drive.google.com/file/...",
					adminComments:
						"Approved based on department travel budget.",
					approvalTime: new Date("2026-01-16"),
					createdAt: new Date("2026-01-15"),
					updatedAt: new Date("2026-01-16"),
				},
				{
					id: "c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f",
					userId: activeUserId,
					type: "advances",
					title: "Workshop Supplies",
					amount: 1500.0,
					status: "Resubmitted",
					category: "Events",
					description:
						"Purchase of workshop kits for coding bootcamp.",
					previousVersion: JSON.stringify({
						title: "Workshop Catering",
						amount: 3000.0,
						description:
							"Advance for snacks and lunch for attendees.",
						adminComments:
							"Catering exceeds per-head limit. Please revise.",
					}),
					createdAt: new Date("2026-02-25"),
					updatedAt: new Date("2026-02-25"),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("finance_records", null, {});
	},
};
