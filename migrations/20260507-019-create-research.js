/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		// Table for Research Projects and Publications
		await queryInterface.createTable("research_works", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			ownerId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			title: { type: Sequelize.STRING, allowNull: false },
			type: {
				type: Sequelize.ENUM("Project", "Publication"),
				allowNull: false,
			},
			abstract: { type: Sequelize.TEXT },
			status: { type: Sequelize.STRING, defaultValue: "Open" },
			category: { type: Sequelize.STRING },
			department: { type: Sequelize.STRING },
			starsCount: { type: Sequelize.INTEGER, defaultValue: 0 },
			openRoles: { type: Sequelize.JSONB, defaultValue: [] },
			timeline: { type: Sequelize.JSONB, defaultValue: [] },
			members: { type: Sequelize.JSONB, defaultValue: [] },
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});

		// Table for Research Applications
		await queryInterface.createTable("research_applications", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			researchId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "research_works", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			roleId: { type: Sequelize.STRING },
			roleName: { type: Sequelize.STRING },
			status: {
				type: Sequelize.ENUM("Pending", "Accepted", "Rejected"),
				defaultValue: "Pending",
			},
			professorNotes: { type: Sequelize.TEXT },
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});

		// Table for Grant Requests
		await queryInterface.createTable("research_grants", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			researchId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "research_works", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			requestId: { type: Sequelize.STRING, unique: true },
			amount: { type: Sequelize.DECIMAL(10, 2) },
			status: {
				type: Sequelize.ENUM(
					"Pending",
					"Approved",
					"Rejected",
					"Resubmitted",
				),
				defaultValue: "Pending",
			},
			reason: { type: Sequelize.TEXT },
			adminComments: { type: Sequelize.TEXT },
			previousVersion: { type: Sequelize.JSONB },
			createdAt: { allowNull: false, type: Sequelize.DATE },
			updatedAt: { allowNull: false, type: Sequelize.DATE },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("research_grants");
		await queryInterface.dropTable("research_applications");
		await queryInterface.dropTable("research_works");

		// Clean up custom ENUM types
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_research_works_type";',
		);
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_research_applications_status";',
		);
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_research_grants_status";',
		);
	},
};
