"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// --- Create Books Table ---
		await queryInterface.createTable("library_books", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			author: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isbn: {
				type: Sequelize.STRING,
				unique: true,
			},
			category: {
				type: Sequelize.STRING,
			},
			availableCopies: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			totalCopies: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
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

		// --- Create Requests Table ---
		await queryInterface.createTable("library_requests", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			bookId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "library_books",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			status: {
				type: Sequelize.ENUM("pending", "approved", "rejected", "extension-pending"),
				defaultValue: "pending",
			},
			requestDate: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			approvedDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			dueDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			durationDays: {
				type: Sequelize.INTEGER,
			},
			rejectionReason: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			physicalCopyPickedUp: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable("library_requests");
		await queryInterface.dropTable("library_books");
		// Clean up the custom ENUM type
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_library_requests_status";',
		);
	},
};