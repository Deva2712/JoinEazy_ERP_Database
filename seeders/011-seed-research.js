/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
        /**
		 * ATTENTION: Replace with UUIDs that exist in 'users' table.
		 */
		const professorId = "REPLACE_WITH_ACTUAL_USER_ID";
		const studentId = "REPLACE_WITH_ACTUAL_USER_ID";
		const workId = "a1b2c3d4-e5f6-4a5b-bc6d-7e8f9a0b1c2d";

		// Seed a Research Project
		await queryInterface.bulkInsert("research_works", [
			{
				id: workId,
				ownerId: professorId,
				title: "AI in Sustainable Energy",
				type: "Project",
				abstract:
					"Developing neural networks to optimize power distribution.",
				status: "Open",
				category: "Computer Science",
				department: "Engineering",
				starsCount: 5,
				openRoles: JSON.stringify([
					{
						id: "role-1",
						roleName: "Data Analyst",
						description: "Analyzing grid data.",
					},
				]),
				timeline: JSON.stringify([
					{
						id: "time-1",
						title: "Literature Review",
						date: "2026-06-01",
						status: "Completed",
					},
				]),
				members: JSON.stringify(["Dr. Aris", "Prof. Jane"]),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// Seed an Application
		await queryInterface.bulkInsert("research_applications", [
			{
				id: "b2c3d4e5-f6a7-5b6c-cd7d-8e9f0a1b2c3d",
				researchId: workId,
				userId: studentId,
				roleId: "role-1",
				roleName: "Data Analyst",
				status: "Pending",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// Seed a Grant Request
		await queryInterface.bulkInsert("research_grants", [
			{
				id: "c3d4e5f6-a7b8-6c7d-de8e-9f0a1b2c3d4e",
				userId: professorId,
				researchId: workId,
				requestId: "REQ-2026-101",
				amount: 5000.0,
				status: "Pending",
				reason: "Required for high-performance computing resources.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("research_grants", null, {});
		await queryInterface.bulkDelete("research_applications", null, {});
		await queryInterface.bulkDelete("research_works", null, {});
	},
};
