/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		// Table for managing faculty leave applications and substitutions
		await queryInterface.createTable("leaves", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				// Links to the faculty member requesting leave
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			type: {
				type: Sequelize.STRING, // e.g., "Sick", "Casual", "Duty Leave"
				allowNull: false,
			},
			startDate: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			endDate: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			reason: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			substituteId: {
				type: Sequelize.UUID,
				allowNull: true,
				// Links to the colleague covering the classes
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			substitutionStatus: {
				type: Sequelize.ENUM("Pending", "Accepted", "Declined"),
				defaultValue: "Pending",
			},
			status: {
				type: Sequelize.ENUM("Pending", "Approved", "Rejected"),
				defaultValue: "Pending",
			},
			remarks: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			isArchived: {
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
		await queryInterface.dropTable("leaves");
		// Clean up custom ENUM types
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_leaves_substitutionStatus";',
		);
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_leaves_status";',
		);
	},
};
