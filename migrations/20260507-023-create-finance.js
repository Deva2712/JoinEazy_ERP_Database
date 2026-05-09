"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("finance_records", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				// Links the financial request to the requesting employee
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			type: {
				type: Sequelize.ENUM("expenses", "advances"),
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			amount: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM(
					"Pending",
					"Approved",
					"Rejected",
					"Reimbursed",
					"Resubmitted",
				),
				defaultValue: "Pending",
			},
			category: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			proofDocLink: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			adminComments: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			approvalTime: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			previousVersion: {
				type: Sequelize.JSONB,
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("finance_records");
		// Clean up custom ENUM types to ensure a clean state for re-runs
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_finance_records_type";',
		);
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_finance_records_status";',
		);
	},
};
