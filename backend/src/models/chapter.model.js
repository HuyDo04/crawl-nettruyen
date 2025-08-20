module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define(
        "Chapter",
        {
            comicId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            url: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            number: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: true,
            },
            content: {
                type: DataTypes.JSON, // Lưu danh sách ảnh dạng mảng JSON
                allowNull: true,
                comment: "Mảng URL ảnh chapter"
            },
            crawlStatus: {
                type: DataTypes.ENUM("pending", "completed"),
                defaultValue: "pending",
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "chapters",
            timestamps: true,
        }
    );

    Chapter.associate = (db) => {
        Chapter.belongsTo(db.Comic, {
            foreignKey: "comicId",
            as: "comic",
        });
    };

    return Chapter;
};
