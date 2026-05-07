"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("payrolls", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			payrollId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				// Enforces that every payroll belongs to a real user in 'users' table
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			month: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			amount: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			status: {
				// Create a custom TYPE 'enum_payrolls_status'
				type: Sequelize.ENUM("Paid", "Pending", "Processing"),
				defaultValue: "Paid",
			},
			paidAt: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			breakdown: {
				type: Sequelize.JSONB,
				allowNull: false,
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
		await queryInterface.dropTable("payrolls");
		// Clean up ENUM type to prevent errors on re-run
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_payrolls_status";',
		);
	},
};
