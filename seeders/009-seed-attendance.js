/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Replace with UUIDs that exist in 'users' and 'cohorts' tables.
		 */
		const facultyId = "USER_ID_FROM_USERS_TABLE";
		const activeCohortId = "COHORT_ID_FROM_COHORTS_TABLE";

		// Seed student attendance session
		await queryInterface.bulkInsert("attendance_logs", [
			{
				id: "661f9511-f30c-52e5-b827-557766551111",
				recordedBy: facultyId,
				cohortId: activeCohortId,
				section: "Morning-A",
				date: "2026-05-10",
				presentStudentIds: JSON.stringify([
					"STU-001",
					"STU-002",
					"STU-005",
				]),
				isFinal: true,
				lastUpdated: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// Seed professor work activity and experience logs
		await queryInterface.bulkInsert("professor_activity_logs", [
			{
				id: "772g0622-g41d-63f6-c938-668877662222",
				userId: facultyId,
				date: "2026-05-10",
				type: "WorkLog",
				details: JSON.stringify({
					checkIn: "08:00 AM",
					checkOut: "04:30 PM",
					totalHours: "8.5",
					location: "Main Campus",
				}),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "883h1733-h52e-74g7-d049-779988773333",
				userId: facultyId,
				date: "2026-05-11",
				type: "Experience",
				details: JSON.stringify({
					eventName: "Tech Innovation Seminar",
					role: "Guest Speaker",
					location: "Hybrid/Online",
				}),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("attendance_logs", null, {});
		await queryInterface.bulkDelete("professor_activity_logs", null, {});
	},
};
