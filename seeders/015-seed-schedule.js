/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Ensure these UUIDs correspond to valid entries in 'users' table.
		 */
		const facultyId = "USER_ID_OF_PROFESSOR";
		const studentId = "USER_ID_OF_STUDENT";

		// Seed Office Hours
		await queryInterface.bulkInsert("office_hours", [
			{
				id: "a1b2c3d4-e5f6-4a5b-8c9d-0123456789ab",
				userId: facultyId,
				courseName: "Advanced Software Engineering",
				day: "Monday",
				startTime: "10:00 AM",
				endTime: "12:00 PM",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "b2c3d4e5-f6a7-4b6c-9d0e-123456789abc",
				userId: facultyId,
				courseName: "Database Systems",
				day: "Wednesday",
				startTime: "02:00 PM",
				endTime: "04:00 PM",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// Seed Confirmed Events
		await queryInterface.bulkInsert("scheduled_events", [
			{
				id: "c3d4e5f6-a7b8-4c7d-0e1f-23456789abcd",
				hostId: facultyId,
				participantName: "John Doe",
				participantRole: "Student",
				type: "Offline",
				category: "Project Review",
				subject: "Final Year Project Discussion",
				startTime: new Date(
					new Date().setDate(new Date().getDate() + 1),
				), // Tomorrow
				location: "Faculty Room 402",
				status: "scheduled",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// Seed Pending Meeting Requests
		await queryInterface.bulkInsert("meeting_requests", [
			{
				id: "d4e5f6a7-b8c9-4d8e-1f2g-3456789abcde",
				senderId: studentId,
				receiverId: facultyId,
				status: "pending",
				requestedTime: new Date(
					new Date().setDate(new Date().getDate() + 2),
				),
				reason: "Need guidance on internship applications.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("meeting_requests", null, {});
		await queryInterface.bulkDelete("scheduled_events", null, {});
		await queryInterface.bulkDelete("office_hours", null, {});
	},
};
