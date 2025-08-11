<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_application_id')->constrained()->onDelete('cascade');
            $table->foreignId('recruiter_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('candidate_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('scheduled_at');
            $table->string('type')->default('online'); // online, phone, in-person
            $table->string('location')->nullable(); // for in-person interviews
            $table->string('meeting_link')->nullable(); // for online interviews
            $table->string('status')->default('scheduled'); // scheduled, completed, cancelled, rescheduled
            $table->text('notes')->nullable();
            $table->text('feedback')->nullable();
            $table->integer('duration')->default(60); // in minutes
            $table->boolean('reminder_sent')->default(false);
            $table->timestamps();
            
            $table->index(['scheduled_at', 'status']);
            $table->index(['recruiter_id', 'scheduled_at']);
            $table->index(['candidate_id', 'scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
