/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Replace 'USER_ID_FROM_USERS_TABLE' with
		 * a valid UUID from 'users' table.
		 */
		const activeUserId = "USER_ID_FROM_USERS_TABLE";

		await queryInterface.bulkInsert(
			"exam_duties",
			[
				{
					id: "f47ac10b-58cc-4372-a567-0e02b2c3d401",
					userId: activeUserId,
					courseName: "Introduction to Computer Science",
					courseCode: "CS 101",
					type: "Final Exam",
					startTime: new Date("2026-03-25T04:00:00Z"),
					endTime: new Date("2026-03-25T07:00:00Z"),
					hall: "Main Auditorium",
					reportingTime: new Date("2026-03-25T03:30:00Z"),
					status: "ASSIGNED",
					isCheckedIn: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: "f47ac10b-58cc-4372-a567-0e02b2c3d406",
					userId: activeUserId,
					courseName: "Quantum Physics",
					courseCode: "PH 401",
					type: "Final Exam",
					startTime: new Date("2026-03-30T09:00:00Z"),
					endTime: new Date("2026-03-30T12:00:00Z"),
					hall: "Physics Lab 1",
					reportingTime: new Date("2026-03-30T08:30:00Z"),
					status: "REJECTION_REVIEW",
					rejectionReason: "Medical emergency - doctor appointment",
					isCheckedIn: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: "f47ac10b-58cc-4372-a567-0e02b2c3d407",
					userId: activeUserId,
					courseName: "Ethics in Technology",
					courseCode: "CS 505",
					type: "Midterm",
					startTime: new Date("2026-03-31T14:00:00Z"),
					endTime: new Date("2026-03-31T16:00:00Z"),
					hall: "Seminar Room B",
					reportingTime: new Date("2026-03-31T13:30:00Z"),
					status: "REJECTION_REVOKED",
					rejectionReason: "Conflicting lecture schedule",
					rejectionApproval: JSON.stringify({
						exam_department: {
							status: "REVOKED",
							remark: "Schedule conflict resolved.",
						},
						admin: {
							status: "REVOKED",
							remark: "Confirmed: Attend as per original allocation.",
						},
					}),
					isCheckedIn: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("exam_duties", null, {});
	},
};
