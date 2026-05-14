"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Ensure these UUIDs correspond to valid entries in 'users' table.
		 */
		const mentorId = "USER_ID_OF_PROFESSOR";
		const studentId = "USER_ID_OF_STUDENT";

		// ─── Seed Mentee Profiles ─────────────────────────────────────────────
		await queryInterface.bulkInsert("mentee_profiles", [
			{
				id: Sequelize.fn("gen_random_uuid"),
				userId: studentId,
				mentorId: mentorId,
				department: "Computer Science",
				section: "CSE-A",
				semester: 4,
				batch: "2021 - 2025",
				studentType: "Day Scholar",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// ─── Seed Initial Meetings ────────────────────────────────────────────
		await queryInterface.bulkInsert("mentoring_meetings", [
			{
				id: "MTG-ST11001-101",
				studentId: studentId,
				mentorId: mentorId,
				date: new Date("2025-11-20"),
				status: "Completed",
				hasAttended: true,
				discussionSummary:
					"Discussed career goals and interest in Machine Learning.",
				actionPlan: JSON.stringify({
					studentTasks: ["Enroll in an online ML certification"],
					skillImprovement: ["Python optimization"],
				}),
				performanceRatings: JSON.stringify({
					academic: 4,
					professional: 5,
					personal: 4,
				}),
				overallRemarks: "John is highly motivated.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "MTG-ST11001-205",
				studentId: studentId,
				mentorId: mentorId,
				date: new Date("2026-03-30"),
				status: "Requested",
				requestReason:
					"Inquiry regarding summer internship opportunities.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("mentoring_meetings", null, {});
		await queryInterface.bulkDelete("mentee_profiles", null, {});
	},
};
